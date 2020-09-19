import { container } from 'tsyringe';

import IHasheProvider from './HashProvider/models/IHasheProvider';
import BCriptHashProvider from './HashProvider/implementations/BCriptHashProvider';

container.registerSingleton<IHasheProvider>('HashProvider', BCriptHashProvider);
