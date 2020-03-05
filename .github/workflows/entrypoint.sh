workflow "Build and Deploy Pages" {
  on = "push"
  resolves = ["Build", "Deploy Pages"]
}

action "Build" {
  uses = "guahanweb/actions/node-app@master"
  env = {
    PKG_MANAGER = "yarn"
  }
  args = "run build"
}

action "Deploy Pages" {
  uses = "guahanweb/actions/node-app@master"
  secrets = "9405c6b56cec8545c83cd528278817c25614340e"
  args = "gh-pages"
  needs = ["Build"]
}
