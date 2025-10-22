import { useUnit } from "effector-react";
import { isNotNil } from "ramda";
import { tw } from "typewind";

import { IconBrandVk, IconPremiumRights, IconWorldWww } from "@tabler/icons-react";

import { Loader } from "@app/shared/ui-kit/components";

import type { PlatformStatisticModel } from "../model";

export const PlatformStatistic = ({ $$model }: { $$model: PlatformStatisticModel }) => {
    const [statistic, isLoading] = useUnit([$$model.$data, $$model.$isLoading]);

    return (
        <div className={tw.bg_light_blue.p_4.flex.flex_col.max_w_["640px"].gap_4}>
            {isLoading && <Loader size={32} centered={true} />}

            {isNotNil(statistic) && (
                <>
                    <div className={tw.flex.basis_full.items_start.gap_2.py_2}>
                        <IconPremiumRights width={24} height={24} className={tw.shrink_0} />

                        <div className={tw.text_body_20}>
                            <span className={tw.font_semibold}>Всего подписчиков:</span>

                            <span>
                                &nbsp;{statistic.subscriptionsCount + statistic.vkDonutsCount}
                            </span>
                        </div>
                    </div>

                    <div className={tw.flex.flex_col.md(tw.flex_row)}>
                        <div className={tw.flex.basis_full.items_start.gap_2.py_2}>
                            <IconWorldWww width={24} height={24} className={tw.shrink_0} />

                            <div className={tw.text_body_20}>
                                <span className={tw.font_semibold}>Веб-сайт:</span>
                                <span>&nbsp;{statistic.subscriptionsCount}</span>
                            </div>
                        </div>

                        <div className={tw.flex.basis_full.items_start.gap_2.py_2}>
                            <IconBrandVk width={24} height={24} className={tw.shrink_0} />

                            <div className={tw.text_body_20}>
                                <span className={tw.font_semibold}>VK Donut:</span>
                                <span>&nbsp;{statistic.vkDonutsCount}</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
