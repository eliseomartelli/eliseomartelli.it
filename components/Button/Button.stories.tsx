import { Button } from "./Button";
import "tailwindcss/tailwind.css";

export default {
  title: "Components/Button",
};

export const Normal = () => <Button>Hello</Button>;
export const Big = () => <Button isBig>Hello</Button>;
export const Active = () => <Button isActive>Hello</Button>;
export const Red = () => <Button isRed>Hello</Button>;
