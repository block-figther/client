import * as Toast from '@radix-ui/react-toast';

export const ToastUI = () => (
  <Toast.Provider>
    <Toast.Root>
      <Toast.Title />
      <Toast.Description />
      {/* <Toast.Action /> */}
      <Toast.Close />
    </Toast.Root>

    <Toast.Viewport />
  </Toast.Provider>
);
