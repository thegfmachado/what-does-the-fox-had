import { randomInt } from "./number";

let lastUserAgent: string = '';

export function randomUseragent(): string {
  const agents = [
    'Mozilla/5.0 (Windows NT 6.2; rv:20.0) Gecko/20121202 Firefox/20.0',
    'Mozilla/5.0 (X11; Fedora; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
    'Mozilla/5.0 (X11; Linux i686; rv:16.0) Gecko/20100101 Firefox/16.0',
    'Opera/9.80 (X11; Linux i686) Presto/2.12.388 Version/12.16',
    'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B334b Safari/531.21.10',
    'Mozilla/5.0 (iPad; U; CPU OS 4_2_1 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
    'Mozilla/5.0 (Linux; Android 4.4.2; LG-V410 Build/KOT49I.V41010d) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.103 Safari/537.36',
    'Mozilla/5.0 (Linux; Android 7.0; Moto G (5) Plus Build/NPNS25.137-35-5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.107 Mobile Safari/537.36',
    'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.36 Safari/535.7',
    'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/531.21.8 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10'
  ];

  const filteredArr = agents.filter(userAgent => userAgent !== lastUserAgent);

  const newUserAgent = filteredArr[randomInt(0, filteredArr.length - 1)];

  lastUserAgent = newUserAgent;

  return newUserAgent;
}
