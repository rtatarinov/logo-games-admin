import type { Effect } from "effector";
import { sample } from "effector";
import { is } from "ramda";

import type { Contract, InvalidDataError, Query } from "@farfetched/core";
import {
    // eslint-disable-next-line no-restricted-imports
    createMutation as originalCreateMutation,
    // eslint-disable-next-line no-restricted-imports
    createQuery as originalCreateQuery,
} from "@farfetched/core";

import { createEvent } from "@app/shared/effector";

export const isContractDataError = (error: unknown): error is InvalidDataError =>
    is(Object, error) &&
    "validationErrors" in error &&
    "errorType" in error &&
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    error.errorType === "INVALID_DATA";

type CreateQueryConfig<Params, Response, Error, ContractData extends Response = Response> =
    | {
          effect: Effect<Params, Response, Error>;
          initialData?: undefined;
          contract?: undefined;
      }
    | {
          effect: Effect<Params, Response, Error>;
          initialData: Response;
          contract?: undefined;
      }
    | {
          effect: Effect<Params, Response, Error>;
          contract: Contract<Response, ContractData>;
          initialData?: undefined;
      }
    | {
          effect: Effect<Params, Response, Error>;
          contract: Contract<Response, ContractData>;
          initialData: ContractData;
      };

export const handleApiError = createEvent<unknown>();

export const createAppQuery = <Params, Response, Error, ContractData extends Response = Response>(
    config: CreateQueryConfig<Params, Response, Error, ContractData>,
): Query<Params, ContractData, Error | InvalidDataError, ContractData> => {
    const query = originalCreateQuery(config);

    sample({
        clock: query.finished.failure,
        fn: ({ error }) => error as unknown,
        target: handleApiError,
    });

    return query as unknown as Query<Params, ContractData, Error | InvalidDataError, ContractData>;
};

type CreateMutationConfig<Params, Response, Error, ContractData extends Response = Response> =
    | {
          effect: Effect<Params, Response, Error>;
          contract?: undefined;
      }
    | {
          effect: Effect<Params, Response, Error>;
          contract: Contract<Response, ContractData>;
      };

export const createAppMutation = <
    Params,
    Response,
    Error,
    ContractData extends Response = Response,
>(
    config: CreateMutationConfig<Params, Response, Error, ContractData>,
): Query<Params, ContractData, Error | InvalidDataError, ContractData> => {
    const mutation = originalCreateMutation(config);

    sample({
        clock: mutation.finished.failure,
        fn: ({ error }) => error as unknown,
        target: handleApiError,
    });

    return mutation as unknown as Query<
        Params,
        ContractData,
        Error | InvalidDataError,
        ContractData
    >;
};
