const fs = require('fs')
const path = require('path')

let lastViewsLength = 0

function updateWork() {
  // eslint-disable-next-line
  console.log("LAUNCH UPDATE")
  
  const views = fs.readdirSync(path.resolve(__dirname, 'views'))
  const routes = views.map(view => ({
    path: view == 'Home.vue' ? '/' : '/' + view.replace(/\.vue/, '').toLowerCase(),
    name: view.replace(/\.vue/, '').toLowerCase(),
    filePath: `./views/${view}`
  }))
  
  fs.writeFileSync(path.resolve(__dirname, 'routes.json'), JSON.stringify(routes))
  
  // eslint-disable-next-line
  console.log(`UPDATE FINISHED. TOTAL ${views.length} ROUTES, ${views.length - lastViewsLength} NEW. `)
  lastViewsLength = views.length
}

updateWork()

fs.watch(path.resolve(__dirname, 'views'), () => {
  updateWork()
})

