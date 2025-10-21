export interface ByteBuffer {
    capacity(): number;

    length(): number;

    append(buf: Uint8Array): void;

    data(): Uint8Array;

    reset(): void;
}

export const newByteBuffer = (cap: number): ByteBuffer => {
    const buf = new Uint8Array(cap);
    let length = 0;

    return {
        capacity(): number {
            return cap;
        },
        length(): number {
            return length;
        },
        append(from: Uint8Array): void {
            const left = cap - length;

            if (from.length > left) {
                throw new Error(
                    `Not enough space left in buffer. Need ${from.length.toString()} bytes, left ${left.toString()} bytes`,
                );
            }

            buf.set(from, length);
            length += from.length;
        },
        data(): Uint8Array {
            return buf.subarray(0, length);
        },
        reset(): void {
            length = 0;
        },
    };
};
