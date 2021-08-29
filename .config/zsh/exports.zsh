#!/bin/zsh

export PATH=$HOME/bin:/usr/local/bin:$PATH
export ZSH="$HOME/.oh-my-zsh"
export PYTHONSTARTUP="$(python3 -m jedi repl)"

if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='vim'
else
  export EDITOR='nvim'
fi

if [ -f "$HOME/.cargo/env" ]; then
  source "$HOME/.cargo/env"
else
  export PATH="$HOME/.cargo/bin:$PATH"
fi

if [ -d "/Library/Frameworks/Python.framework/Versions/3.9/bin" ]; then
  export PATH="/Library/Frameworks/Python.framework/Versions/3.9/bin:$PATH"
fi

#if [ -d "$HOME/Desktop/programming/python/scripts/bin" ]; then
#  export PATH="$HOME/Desktop/programming/python/scripts/bin:$PATH"
#fi
