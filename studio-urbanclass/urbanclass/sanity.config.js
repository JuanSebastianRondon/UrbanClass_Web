import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {createElement} from 'react'

export default defineConfig({
  name: 'default',
  title: 'UrbanClass',

  projectId: 'y67i0hab',
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

    icon: () => createElement('img', {
    src: '/static/logo.png',
    alt: 'Urban Class logo',
    style: { width: '100%', height: '100%' }
  }),
})
