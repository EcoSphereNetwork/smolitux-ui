import { BoxBaseProps } from './box';

// Card props
export interface CardBaseProps extends BoxBaseProps {
  /** Whether the card has a border */
  bordered?: boolean;
  /** Whether the card has a shadow */
  shadowed?: boolean;
  /** Whether the card has rounded corners */
  rounded?: boolean;
  /** Whether the card has padding */
  padded?: boolean;
  /** Whether the card has a hover effect */
  hoverable?: boolean;
}
