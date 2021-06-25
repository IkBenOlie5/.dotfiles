import random

import click


def uwuify(text: str) -> str:
    result = ""
    for word in text.split(" "):
        if word.startswith("n"):
            word = "ny" + word[1:]
        if random.randint(1, 5) == 1:
            word = word[0] + "-" + word[0] + word[1:]

        result += word + " "

    result = (
        result.replace("l", "w").replace("r", "w").replace("L", "W").replace("R", "W")
    )

    result += random.choice(("uwu", "owo", "uvu", "^w^"))
    return result


@click.command()
@click.argument("text", default="")
@click.option(
    "--path",
    "--file",
    "-p",
    "-f",
    default=False,
    type=str,
    help=uwuify("The file to uwuify."),
)
@click.option(
    "--save", "-s", default=False, type=str, help=uwuify("Save the result in a file.")
)
def uwuify_command(text, path, save):
    if path:
        try:
            with open(path, "r+", encoding="utf-8") as f:
                text = f.read()
        except Exception:
            return print(uwuify("Unable to open/read file."))
    if save:
        with open(save, "w+", encoding="utf-8") as save_file:
            save_file.write(uwuify(text))
        exit(0)
    print(uwuify(text))


if __name__ == "__main__":
    uwuify_command(prog_name="uwuify")
