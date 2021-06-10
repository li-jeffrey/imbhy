import { KMB_PROVIDER } from "./providers/kmb";
import NWFB_CTY_PROVIDER from "./providers/ctb-nwfb";

export const PROVIDERS = {
    KMB: KMB_PROVIDER,
    NWFB: NWFB_CTY_PROVIDER('NWFB'),
    CITYBUS: NWFB_CTY_PROVIDER('CTB'),
}