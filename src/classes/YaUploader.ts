import axios from 'axios';

export class YaUploader {
    private token: string;
    private headers: Record<string, string>;

    constructor(token: string) {
        this.token = token;
        this.headers = {
            'Accept': 'application/json',
            'Authorization': `OAuth ${this.token}`,
        };
    }

    async createFolder(path: string) {
        const urlCreate = 'https://cloud-api.yandex.net/v1/disk/resources';

        try {
            await axios.put(`${urlCreate}?path=${path}`, null, { headers: this.headers });
            console.log("Folder created");
        } catch (error) {
            console.error("Error creating folder:", error);
        }
    }

    async uploadPhoto(path: string, urlFile: string, name: string) {
        const url = "https://cloud-api.yandex.net/v1/disk/resources/upload";

        const params = {
            path: `/${path}/${name}`,
            url: urlFile,
            overwrite: "true",
        };
        try {
            await axios.post(url, null, { headers: this.headers, params });
            console.log(`Uploaded: ${name}`);
        } catch (error) {
            console.error(`Error uploading ${name}:`, error);
        }
    }

    async checkFilesInFolder(folderPath: string) {
        try {
            const res = await axios.get(`https://cloud-api.yandex.net/v1/disk/resources?path=${folderPath}`, { headers: this.headers });
            const items = res.data._embedded?.items || [];
            items.forEach((item: any) => {
                if (item.type === 'file') {
                    console.log(`File found: ${item.name}`);
                }
            });
        } catch (error) {
            console.error("Error fetching files from Yandex Disk:", error);
        }
    }
}
