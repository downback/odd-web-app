declare module "flubber" {
  export function interpolate(
    fromShape: string,
    toShape: string,
    options?: any
  ): (t: number) => string
}
