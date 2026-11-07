import { defineMermaidSetup } from '@slidev/types'

export default defineMermaidSetup(() => ({
  theme: 'base',
  // Excalidraw-style sketch (rough.js). Override per diagram with `config: { look: classic }`.
  look: 'handDrawn',
  fontFamily: '"Geist Variable", sans-serif',
  themeVariables: {
    darkMode: true,
    background: 'transparent',
    fontSize: '18px',
    primaryColor: 'rgb(52, 63, 96)',
    mainBkg: 'rgb(52, 63, 96)',
    primaryTextColor: 'rgb(234, 237, 243)',
    primaryBorderColor: 'rgb(255, 107, 237)',
    nodeBorder: 'rgb(255, 107, 237)',
    secondaryColor: 'rgb(138, 51, 123)',
    tertiaryColor: 'rgb(33, 39, 55)',
    lineColor: 'rgb(171, 75, 153)',
    textColor: 'rgb(234, 237, 243)',
    clusterBkg: 'rgba(52, 63, 96, 0.35)',
    clusterBorder: 'rgb(171, 75, 153)',
    edgeLabelBackground: 'rgb(33, 39, 55)',
    actorBkg: 'rgb(52, 63, 96)',
    actorBorder: 'rgb(255, 107, 237)',
    actorTextColor: 'rgb(234, 237, 243)',
    signalColor: 'rgb(234, 237, 243)',
    signalTextColor: 'rgb(234, 237, 243)',
    noteBkgColor: 'rgb(138, 51, 123)',
    noteTextColor: 'rgb(234, 237, 243)',
    noteBorderColor: 'rgb(255, 107, 237)',
  },
}))
