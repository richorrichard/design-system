import React, { Children } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box } from '../../Box';
import { Divider } from './Divider';
import { Flex } from '../../Flex';

const AlignedList = styled(Flex)`
  // CrumbLinks do have padding-x, because they need to have a
  // interaction effect, which mis-aligns the breadcrumbs on the left.
  // This normalizes the behavior by moving the first item to left by
  // the same amount it has inner padding
  :first-child {
    margin-left: ${({ theme }) => `calc(-1*${theme.spaces[2]})`};
  }
`;

export const Breadcrumbs = ({ label, children, ...props }) => {
  return (
    <Box aria-label={label} {...props}>
      <AlignedList as="ol" horizontal>
        {Children.map(children, (child, index) => {
          const isLast = index + 1 === children.length;

          return (
            <Flex inline as="li">
              {child}
              {!isLast && <Divider />}
            </Flex>
          );
        })}
      </AlignedList>
    </Box>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';

Breadcrumbs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  label: PropTypes.string.isRequired,
};
