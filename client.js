import axios from 'axios';

class Sparkasse {
    constructor() {
        this.url = this.url;
        this.bankleitzahl = this.bankleitzahl;
    }

    async getInstitute(query) {
        const response = await axios.get(
            `https://www.sparkasse.de/api/institutes?query=${query}`,
            {
                headers: {
                    "accept": "application/json, text/plain, */*",
                    "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
                    "priority": "u=1, i",
                    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin"
                },
                referrer: "https://www.sparkasse.de/standorte",
                withCredentials: true
            }
        );
        
        return response.data.institutes.items;
    }

    async getURL(blz) {
        const url = `https://redirector.webservices.sparkasse.de/?tu_key=banking-servicebox&tu_bez=content&blz=${blz}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                    "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
                    "priority": "u=0, i",
                    "sec-ch-ua": "\"Not;A=Brand\";v=\"99\", \"Google Chrome\";v=\"139\", \"Chromium\";v=\"139\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\"",
                    "sec-fetch-dest": "document",
                    "sec-fetch-mode": "navigate",
                    "sec-fetch-site": "same-site",
                    "sec-fetch-user": "?1",
                    "upgrade-insecure-requests": "1"
                },
                referrer: "https://www.sparkasse.de/",
                withCredentials: true,
                maxRedirects: 0,
                validateStatus: (status) => status === 302 
            });
            
            return response.headers['location'];
        } catch (error) {
            if (error.response && error.response.status === 302) {
                return error.response.headers['location'];
            }
            throw error;
        }
    }
}

export default Sparkasse;