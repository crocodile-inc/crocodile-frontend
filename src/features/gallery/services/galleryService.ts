import { api } from '~/http';
import { UnraveledPicture } from '~/features/gallery/models';

export class GalleryService {
  static async getUnraveled() {
    return await api.get<UnraveledPicture[]>(`/gallery/unraveled`);
  }
}
