import { DogUploaderApp } from './classes/DogUploaderApp';

require('dotenv').config()

const TOKEN: string = process.env.TOKEN || '';

const breeds = ['doberman', 'bulldog', 'collie'];
const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];

(async () => {
    const app = new DogUploaderApp(TOKEN, 'test_folder4');
    await app.uploadBreedImages(randomBreed);
})();
