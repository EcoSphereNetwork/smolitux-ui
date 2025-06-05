import logging
import click

@click.group()
@click.option('--debug', is_flag=True, help='Enable debug mode.')
@click.pass_context
def cli(ctx: click.Context, debug: bool) -> None:
    """Simple CLI root."""
    logging.basicConfig(level=logging.DEBUG if debug else logging.INFO)
    ctx.obj = {'debug': debug}

@cli.command()
@click.option('--name', default='World', help='Name to greet.')
def hello(name: str) -> None:
    """Say hello."""
    click.echo(f"Hello, {name}!")

@cli.command()
@click.argument('a', type=float)
@click.argument('b', type=float)
def add(a: float, b: float) -> None:
    """Add two numbers."""
    click.echo(f"{a} + {b} = {a + b}")


def main() -> None:
    """Entry point for console script."""
    cli()

if __name__ == '__main__':
    main()
