#exports
export PATH=$HOME/bin:/usr/local/bin:$PA
export ZSH="/Users/oli4/.oh-my-zsh"

#options
ENABLE_CORRECTION="true"
COMPLETION_WAITING_DOTS="true"
HISTFILE=~/.histfile
HISTSIZE=5000
SAVEHIST=5000

#theme
ZSH_THEME="robbyrussell"

#plugins
plugins=(
  git
  gitignore
  python
  virtualenv
)

setopt autocd beep nomatch
unsetopt appendhistory extendedglob notify
bindkey -v

#aliases
alias q="exit"
alias sz="source ~/.zshrc"
alias va="source ./.venv/bin/activate"
alias vd="deactivate"

#pyhton scripts
pycomp() {
  python3 ~/.python_scripts/compiler.py $PWD/$1
}

atlas() {
  python3 ~/.python_scripts/atlas.py $1 $2 $3 $4
}

# set and change java versions
removeFromPath() {
  export PATH=$(echo $PATH | sed -E -e "s;:$1;;" -e "s;$1:?;;")
}

setjdk() {
  if [ $# -ne 0 ]; then
    removeFromPath '/System/Library/Frameworks/JavaVM.framework/Home/bin'
    if [ -n "${JAVA_HOME+x}" ]; then
      removeFromPath $JAVA_HOME
    fi
    export JAVA_HOME=$(/usr/libexec/java_home -v $@)
    export PATH=$JAVA_HOME/bin:$PATH
  fi
}

#sources
source $ZSH/oh-my-zsh.sh
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
