export const Btn = ({ children, ...props }: any) => (
  <button
    type="button"
    className="inline-flex items-center p-1 ml-2 text-sm bg-transparent rounded-sm hover:bg-white hover:text-gray-500"
    {...props}
  >
    {children}
  </button>
)
