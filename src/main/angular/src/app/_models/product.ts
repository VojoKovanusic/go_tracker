import {Serializable} from "../../generated/model";

export interface Product extends Serializable {
  id: number;
  title: string;
  description: string;
  carType: string;
  price: number;
}
