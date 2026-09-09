import { BanknoteArrowDown, BanknoteArrowUp, Briefcase, Car, CarTaxiFront, Coffee, Film, HandCoins, Heart, Home, Plus, ShoppingBag, Smartphone, Utensils, Wallet } from "lucide-react";

const ICON_MAP =  {
    default: Wallet,
    shopping: ShoppingBag,
    coffee: Coffee,
    car: Car,
    food: Utensils,
    work: Briefcase,
    movie: Film,
    health: Heart,
    phone: Smartphone,
    lyft: CarTaxiFront,
    income: BanknoteArrowUp,
    withdraw: BanknoteArrowDown,
    transfer: HandCoins,
    home: Home,
    plus: Plus,
};

export default ICON_MAP;