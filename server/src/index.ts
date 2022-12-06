import longPolling from './longPolling/longPolling';
import { PORT } from './utils';

longPolling.listen(PORT, () => console.log(`Server started on port ${PORT}`));
