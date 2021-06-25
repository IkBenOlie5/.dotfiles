ENABLE_CORRECTION="true"
COMPLETION_WAITING_DOTS="true"

plugins=(git gitignore virtualenv python vi-mode)

source $ZSH/oh-my-zsh.sh
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh

if [ -x "$(command -v quicknav)" ]; then
  eval "$(quicknav init zsh)"
fi

VI_MODE_SET_CURSOR=false
VI_MODE_RESET_PROMPT_ON_MODE_CHANGE=true
