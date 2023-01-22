export const coffeeKeys = {
  all: ["coffee"],
  list: (type) => [...coffeeKeys.all, { type }],
  details: () => [...coffeeKeys.all, "detail"],
  detail: (id) => [...coffeeKeys.details(), id],
};
