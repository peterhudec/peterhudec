read -e -p  "This will build and deploy the app to peterhudec.com!
Do you really wanna proceed? [y/N] " YN
[[ $YN == "y" || $YN == "Y" ]] &&
(
  cd ./peterhudec.github.io
  git reset --hard
  git rm -r *
  npm run production
  git add -A
  git commit -m "Built on `date -u +'%Y-%m-%d %H:%M:%S'`."
  git push
)