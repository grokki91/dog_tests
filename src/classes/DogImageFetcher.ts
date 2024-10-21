import axios from 'axios';

export class DogImageFetcher {
    async fetchSubBreeds(breed: string): Promise<string[]> {
        try {
            const res = await axios.get(`https://dog.ceo/api/breed/${breed}/list`);
            return res.data.message || [];
        } catch (error) {
            console.error(`Error fetching sub-breeds for ${breed}:`, error);
            return [];
        }
    }

    async fetchUrls(breed: string, subBreeds: string[]): Promise<string[]> {
        const urls: string[] = [];
        const fetchImage = async (subBreed: string) => {
            try {
                const res = await axios.get(`https://dog.ceo/api/breed/${breed}/${subBreed}/images/random`);
                return res.data.message;
            } catch (error) {
                console.error(`Error fetching image for ${breed} ${subBreed}:`, error);
                return null;
            }
        };

        if (subBreeds.length > 0) {
            const promises = subBreeds.map(subBreed => fetchImage(`${subBreed}`));
            const images = await Promise.all(promises);
            urls.push(...images.filter(Boolean));
        } else {
            const res = await fetchImage(breed);
            if (res) urls.push(res);
        }
        return urls;
    }
}
