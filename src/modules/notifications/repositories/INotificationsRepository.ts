import ICreateNotificatonDTO from '../dtos/ICreateNotificatonDTO';
import Notification from '../infra/typeorm/schemas/Notification';

export default interface INotificationsRepository {
  create(data: ICreateNotificatonDTO): Promise<Notification>;
}
