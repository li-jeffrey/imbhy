import { KMB_PROVIDER } from "./providers/kmb";
import NWFB_CTY_PROVIDER from "./providers/ctb-nwfb";

const PROVIDERS = {
    NWFB: NWFB_CTY_PROVIDER('NWFB'),
    CITYBUS: NWFB_CTY_PROVIDER('CTB'),
    KMB: KMB_PROVIDER,
}

export default PROVIDERS;