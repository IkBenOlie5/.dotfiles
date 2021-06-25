#exports
export PATH=$HOME/bin:/usr/local/bin:$PATH
export PATH=/Users/oli4/.cargo/bin:$PATH
export ZSH="/Users/oli4/.oh-my-zsh"
export PYTHONSTARTUP="$(python3 -m jedi repl)"


#quicknav
eval "$(quicknav init zsh)"

#options
ZSH_THEME="powerlevel10k/powerlevel10k"
HISTFILE=~/.histfile
HISTSIZE=5000
SAVEHIST=5000
ENABLE_CORRECTION="true"
COMPLETION_WAITING_DOTS="true"


#plugins
plugins=(
  git
  gitignore
  python
  virtualenv
)

#aliases
alias c="clear"
alias q="exit"
alias sz="source ~/.zshrc"
alias va="source ./bin/activate"
alias vd="deactivate"
alias py="python3.9"

#brew services
alias start="brew services start"
alias stop="brew services stop"
alias restart="brew services restart"

#pyhton scripts
pycomp() {
  python3 ~/.python_scripts/compiler.py $@
}

atlas() {
  python3 ~/.python_scripts/atlas.py $@
}

uwuify() {
  python3 ~/.python_scripts/uwuify.py $@
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

#vim mode
bindkey -v
export KEYTIMEOUT=1

#sources
source $ZSH/oh-my-zsh.sh
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh
