### About the Inspection sample tool 🙂

The **Inspection sample tool** helps quality inspectors and production managers determine how many items of each size should be included in a sample for inspection, based on the total lot size, inspection level, and the distribution of sizes within the lot.

#### How it Works

- **Input:**  
  Users enter the quantity of each size present in the lot (e.g., S, M, L, XL).
- **Calculation:**  
  The tool calculates the proportion of each size in the lot and allocates the total required sample size accordingly. This ensures that the inspection sample is representative of the entire lot’s size distribution.
- **Rounding:**  
  The calculator uses rounding to assign whole numbers to each size. If the total does not exactly match the required sample size due to rounding, a warning is displayed.
- **Validation:**  
  The tool checks for negative or zero quantities and prompts the user to correct any errors before calculation.

#### Why is this important?

In garment and manufacturing inspections, it’s crucial to select a sample that accurately reflects the variety within a production lot. By distributing the sample size proportionally across all sizes, the calculator helps ensure that the inspection results are statistically valid and unbiased.

#### Example Use Case

Suppose you have a lot of 1,000 garments in four sizes (S, M, L, XL) and need to inspect a sample of 80 pieces. If 400 are M, 300 are L, 200 are S, and 100 are XL, the calculator will recommend how many pieces of each size to include in your inspection sample, based on their proportion in the lot.


## Scripts

- `npm run dev` – Start the development server
- `npm run build` – Build for production
- `npm run preview` – Preview the production build

## Technologies Used

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

[MIT](LICENSE)