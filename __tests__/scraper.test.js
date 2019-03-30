import fs from 'fs-extra'
import path from 'path'
import { scrapeProfile } from '../lib/scraper'

// Mock fetch
import fetch from 'isomorphic-fetch'
jest.mock('isomorphic-fetch')

const mockFetchWithHTML = html =>
    fetch.mockImplementationOnce(() =>
        new Promise(resolve => resolve({
            text: () => new Promise((resolve) => resolve(html))
        })))

// Load mocks
const publicProfile = fs.readFileSync(path.join(__dirname, './fixtures/public-profile.html'), 'utf8')

describe('scraper', () => {
    test('it should get a public profile', async () => {
        mockFetchWithHTML(publicProfile)
        const data = await scrapeProfile('mpeg')

        delete(data.profile.__meta)
        console.log(data)
        // const res = await fetchTimeline({
        //     source: 'thepeg',
        // })

        // expect(res.length).toBe(20)
    })
})
