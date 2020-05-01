# https://support.glitch.com/t/tutorial-how-to-install-any-package-from-apt-get-on-glitch/10954
touch /tmp/INSTALLED_PACKAGES
PACKAGES="spim"
if [ ! "$PACKAGES" == "$(cat /tmp/INSTALLED_PACKAGES)" ]; then
  cd /tmp
  rm -rf notroot
  git clone https://github.com/CrazyPython/notroot
  source notroot/bashrc
  notroot install $PACKAGES
  echo $PACKAGES > /tmp/INSTALLED_PACKAGES
else
  source /tmp/notroot/bashrc
fi
cd
pnpm install --reporter silent --prefer-offline --audit false
npm run-script run --silent
