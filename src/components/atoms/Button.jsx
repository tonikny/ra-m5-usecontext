import PropTypes from 'prop-types'
import styled from 'styled-components'
import { colors, dimensions } from '../../styles'

const { spacing, borderRadius } = dimensions

const ButtonStyled = styled.button`
  background-color: ${(props) =>
    props.disabled ? colors.white : colors.purple};
  color: ${(props) => (props.disabled === true ? colors.purple : colors.white)};
  border-radius: ${borderRadius.base};
  border: 0;
  padding: ${spacing.xs} ${spacing.base};
  box-shadow: ${colors.shadow.base};
  &:hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`

function Button({ children, type = 'button', disabled = false, ...rest }) {
  return (
    <ButtonStyled type={type} disabled={disabled} {...rest}>
      {children}
    </ButtonStyled>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
}

export default styled(Button)``
