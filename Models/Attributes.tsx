class Attributes {
    public name: string;
    public description: string;
    public life: { min: number, max: number };
    public male_weight: { min: number, max: number };
    public female_weight: { min: number, max: number };
    public hypoallergenic: boolean;
  
    constructor(
      name: string = '',
      description: string = '',
      life: { min: number, max: number } = { min: 0, max: 0 },
      male_weight: { min: number, max: number } = { min: 0, max: 0 },
      female_weight: { min: number, max: number } = { min: 0, max: 0 },
      hypoallergenic: boolean = false
    ) {
      this.name = name;
      this.description = description;
      this.life = life;
      this.male_weight = male_weight;
      this.female_weight = female_weight;
      this.hypoallergenic = hypoallergenic;
    }
  }
  
  export default Attributes;
  