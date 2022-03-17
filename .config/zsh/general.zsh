#!/bin/zsh

ENABLE_CORRECTION="true"
COMPLETION_WAITING_DOTS="true"

plugins=(git gitignore virtualenv python vi-mode common-aliases)

source $ZSH/oh-my-zsh.sh
source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
source /usr/local/share/zsh-autosuggestions/zsh-autosuggestions.zsh
source /usr/local/etc/profile.d/autojump.sh

if [ -x "$(command -v quicknav)" ]; then
  eval "$(quicknav init zsh)"
fi

if [ -x "$(command -v pyenv)" ]; then
  eval "$(pyenv init -)"
  eval "$(command pyenv init --path)"
fi

VI_MODE_SET_CURSOR=false
VI_MODE_RESET_PROMPT_ON_MODE_CHANGE=true
