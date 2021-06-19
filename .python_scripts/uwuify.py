import click
import random


def uwuify(text: str) -> str:
    result = ""
    for word in text.split(" "):
        if word.startswith("n"):
            word = "ny" + word[1:]
        if random.randint(1, 5) == 1:
            word = word[0] + "-" + word[0] + word[1:]

        result += word + " "

    result = result.replace("l", "w").replace("r", "w")

    result += random.choice(("uwu", "owo", "uvu", "^w^"))
    return result


@click.command()
@click.option("--text", "-t", default="", type=str, help=uwuify("The text to uwuify."))
@click.option("--path", "--file", "-p", "-f", default=False, type=str, help=uwuify("The file to uwuify."))
def uwuify_command(text, path):
    if path:
        try:
            with open(path, "r", encoding="utf-8") as f:
                text = f.read()
        except Exception:
            return print(uwuify("Unable to open/read file."))
    print(uwuify(text))


if __name__ == "__main__":
    uwuify_command(prog_name="uwuify")
