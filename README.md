# Gulp new project basis

Create a new static site with Gulp. Compilation of SCSS, COFFEE files. Deployment and optimization of HTML, CSS, JS files for a light upload.

## Prerequisites

What things you need to install :

- [Visual Studio Code](https://code.visualstudio.com/download)
- [npm](https://docs.npmjs.com/cli/install)
- [CSScomb](https://www.npmjs.com/package/csscomb)
- [coffeeScript](https://coffeescript.org/)

## Installing

If you have not already done so :

```
git init
```

then :

```
git remote add gnpb https://github.com/Jaecko/gulp_new_project_basis.git
git pull gnpb master
```

And

```
npm install
```

## Running

### Visual Studio Code

Install and start the **Live Server** plugin so that your page reloads on your browser.

### Compiles files

Compiles files automatically

```
gulp
```

### Live compiles files

Live compiles files when they are modified

```
gulp watch
```

## Deployment

deployment and minification of files in the "dist" folder

```
gulp deploy
```
