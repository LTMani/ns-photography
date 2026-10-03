import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function localContentSaverPlugin() {
  return {
    name: 'local-content-saver',
    configureServer(server) {
      server.middlewares.use('/api/save-content', (req, res, next) => {
        if (req.method === 'POST') {
          let body = ''
          req.on('data', chunk => {
            body += chunk
          })
          req.on('end', () => {
            try {
              const data = JSON.parse(body)
              const dataDir = path.resolve(__dirname, 'src/data')

              if (data.siteConfig) {
                fs.writeFileSync(
                  path.join(dataDir, 'siteConfig.js'),
                  `/**\n * Centralized Site Configuration\n * All global brand texts, hero settings, about metrics, and visual parameters.\n */\nexport const initialSiteConfig = ${JSON.stringify(data.siteConfig, null, 2)};\n`
                )
              }

              if (data.galleryItems || data.workCategories) {
                const catStr = data.workCategories
                  ? `export const initialWorkCategories = ${JSON.stringify(data.workCategories, null, 2)};\n`
                  : 'export const initialWorkCategories = [];\n'
                const galStr = data.galleryItems
                  ? `export const initialGalleryItems = ${JSON.stringify(data.galleryItems, null, 2)};\n`
                  : 'export const initialGalleryItems = [];\n'

                fs.writeFileSync(
                  path.join(dataDir, 'galleryData.js'),
                  `/**\n * Work Categories and Curated South Indian Photography Gallery Data\n */\n\n${catStr}\n${galStr}`
                )
              }

              if (data.servicesData) {
                fs.writeFileSync(
                  path.join(dataDir, 'servicesData.js'),
                  `/**\n * Services and Offerings Data\n */\nexport const initialServicesData = ${JSON.stringify(data.servicesData, null, 2)};\n`
                )
              }

              if (data.contactData) {
                fs.writeFileSync(
                  path.join(dataDir, 'contactData.js'),
                  `/**\n * Contact and Studio Inquiries Data\n */\nexport const initialContactData = ${JSON.stringify(data.contactData, null, 2)};\n`
                )
              }

              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: true, message: 'Source files updated on disk' }))
            } catch (err) {
              res.statusCode = 500
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, error: err.message }))
            }
          })
        } else {
          next()
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    localContentSaverPlugin(),
  ],
})
