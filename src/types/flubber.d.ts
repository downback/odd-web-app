// declare module "flubber" {
//   export function interpolate(
//     fromShape: string,
//     toShape: string,
//     options?: any
//   ): (t: number) => string
// }

declare module "flubber" {
  interface InterpolateOptions {
    maxSegmentLength?: number
    single?: boolean
  }

  export function interpolate(
    fromShape: string,
    toShape: string,
    options?: InterpolateOptions
  ): (t: number) => string
}
