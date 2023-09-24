export class Player
{
    private name: string;

    public constructor(name: string)
    {
        this.name = name;
    }

    public getName()
    {
        return this.name;
    }
}