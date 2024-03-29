import React from "react";
import { Ingredient } from "contentlayer/generated";

export const IngredientsComponent = ({
  ingredients,
  yieldRate,
}: {
  ingredients: Ingredient[];
  yieldRate: Ingredient;
}) => {
  const { quantity, unit } = yieldRate;
  return (
    <>
      <h2>
        Ingredients{" "}
        {yieldRate && (
          <>
            for {quantity} {unit}
          </>
        )}
      </h2>
      <table>
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Unit</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {ingredients.map(({ quantity, unit, name }) => (
            <tr key={name}>
              <td className="text-end">{quantity}</td>
              <td>{unit}</td>
              <td>{name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
