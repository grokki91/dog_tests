import { YaUploader } from './YaUploader';
import { DogImageFetcher } from './DogImageFetcher';

export class DogUploaderApp {
    private folderName: string;
    private yaUploader: YaUploader;
    private dogFetcher: DogImageFetcher;

    constructor(token: string, folderName: string) {
        this.yaUploader = new YaUploader(token);
        this.dogFetcher = new DogImageFetcher();
        this.folderName = folderName;
    }

    async uploadBreedImages(breed: string) {

        await this.yaUploader.createFolder(this.folderName);

        const subBreeds = await this.dogFetcher.fetchSubBreeds(breed);
        const urls = await this.dogFetcher.fetchUrls(breed, subBreeds);

        const uploadPromises = urls.map((url, index) =>
            this.yaUploader.uploadPhoto(this.folderName, url, `${breed}_${index}.jpg`)
        );

        await Promise.all(uploadPromises);
    }
}
