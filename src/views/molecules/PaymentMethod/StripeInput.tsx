import * as React                  from 'react';
import { useTheme }                from '@mui/styles';
import { InputBaseComponentProps } from '@mui/material/InputBase';

const StripeInput = React.forwardRef<any, InputBaseComponentProps>(
  function StripeInput(props, ref) {
    const { component: Component, options, ...other } = props;
    const theme = useTheme();
    const [mountNode, setMountNode] = React.useState<any | null>(null);

    React.useImperativeHandle(
      ref,
      () => ({
        focus: () => mountNode.focus()
      }),
      [mountNode]
    );

    return (
      <Component
        onReady={setMountNode}
        options={{
          ...options,
          style: {
            base: {
              color: 'blue',
              fontSize: '16px',
              lineHeight: '1.4375em', // 23px
            //   fontFamily: theme.typography.fontFamily,
            //   "::placeholder": {
            //     color: alpha(theme.palette.text.primary, 0.42)
            //   }
            },
            invalid: {
              color: 'red'
            }
          }
        }}
        {...other}
      />
    );
  }
);

export default StripeInput;
