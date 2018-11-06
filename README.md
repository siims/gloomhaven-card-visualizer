# Gloomhaven Card Visualizer

### TLDR
Get overview of your Gloomhaven character ability cards. See here: https://siims.github.io/gloomhaven-card-visualizer/

### Motivation
I love overviews and hate physical routine tasks. It takes some tedious work to lay out all ability cards to pick for scenario.

### My character not included?
```
Either
a) create a pull request or
b) create an issue
```

### Dev details
#### Requirements

node v8+ and npm 6+

#### Running locally
```
npm install
npm run start
# open browser and visit http://localhost:3000/
```
#### Adding character
1. Add json data file to `data/` (follow existing examples there)
2. Add symlink to `src/data/` of the newly created json file
3. `src/models/Character.ts` add new type to CharacterType type and CharacterTypes array
4. `src/stores/CharacterDataStore.ts` import newly created data file and insert a line (`this.setCharacter(this.transformToCharacter(yourCharData))`) to method `loadCharacterData`
5. get your character ability card png images
   * character cards' pdf from https://drive.google.com/drive/folders/1pZulOYdbWcVbpArpU8AL39k2yDuqmon-
   * `for f in QM.pdf; do pdftocairo $f -png -scale-to 350; done`
   * rename all cards to have card's name
6. copy images to `public/static/images/cards/`
7. that is all, enjoy!
#### Github pages
There is a separate branch `gh-pages` that is served by github. Updating goes in 7 steps:
```
git checkout gh-pages
git merge master # have latest state
npm run build
rm -r static/ # cleanup previous build files
rsync -a build/* . # make page available on root, not under build
git add -A .
git commit -m "github pages build update"
git push origin gh-pages
```
### Thanks
@saizai for work with gloomhaven [tabletop simulator assets](https://github.com/saizai/gloomhaven_tts) (https://drive.google.com/drive/folders/1SiXb3u2mJbN-Dg2j3Rb-y5amnRJSXIDc) - I never would have bothered to do media processing.
