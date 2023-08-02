import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, {
  TreeItemProps,
  useTreeItem,
  TreeItemContentProps,
  treeItemClasses
} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import Box from '@mui/material/Box';
import Label from '@mui/icons-material/Label';
import Button from '@mui/material/Button';


declare module 'react' {
    interface CSSProperties {
      '--tree-view-color'?: string;
      '--tree-view-bg-color'?: string;
    }
  }

type StyledTreeItemProps = TreeItemProps & {
    bgColor?: string;
    color?: string;
  };

  const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    // color: theme.palette.text.secondary,

    [`& .${treeItemClasses.content}`]: {
    //   color: theme.palette.text.secondary,
    //   borderTopRightRadius: theme.spacing(2),
    //   borderBottomRightRadius: theme.spacing(2),
    //   paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      backgroundColor: 'var(--tree-view-bg-color)',
      color: 'var(--tree-view-color)',
      '&.Mui-expanded': {
        fontWeight: theme.typography.fontWeightRegular,
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    //   '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
    //     backgroundColor: 'var(--tree-view-bg-color)',
    //     color: 'var(--tree-view-color)',
    //   },
    //   [`& .${treeItemClasses.label}`]: {
    //     fontWeight: 'inherit',
    //     color: 'inherit',
    //   },
    },

  }));


const CustomContentRoot = styled('div')(({ theme }) => ({
//   WebkitTapHighlightColor: 'transparent',
  [`& .MuiTreeItem-contentBar`]: {
    position: 'absolute',
    width: '100%',
    height: 24,
    left: 0,
  },
}));

const CustomContent = React.forwardRef(function CustomContent(
  props: TreeItemContentProps,
  ref,
) {
  const {
    className,
    classes,
    label,
    nodeId,
    icon: iconProp,
    expansionIcon,
    displayIcon,
  } = props;

  const {
    disabled,
    expanded,
    selected,
    focused,
    handleExpansion,
    handleSelection,
    preventSelection,
  } = useTreeItem(nodeId);

  const icon = iconProp || expansionIcon || displayIcon;

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    preventSelection(event);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleExpansion(event);
    handleSelection(event);
  };

  return (
    <CustomContentRoot
      className={clsx(className, classes.root, {
        'Mui-expanded': expanded,
        'Mui-selected': selected,
        'Mui-focused': focused,
        'Mui-disabled': disabled,
      })}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <div className="MuiTreeItem-contentBar" />
      <div className={classes.iconContainer}>{icon}</div>
      <Typography component="div" className={classes.label}>
        {label}
      </Typography>
    </CustomContentRoot>
  );
});

function CustomTreeItem(props: StyledTreeItemProps) {
    const theme = useTheme();
    const {
        bgColor,
        color,
        ...other
    } = props;

    const styleProps = {
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      };

  return     <StyledTreeItemRoot

                ContentComponent={CustomContent} 
                style={styleProps}
                {...other} />;
}

export default function BarTreeView() {

    const [expanded, setExpanded] = React.useState<string[]>([]);

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ['1', '5', '6', '7', '8','12'] : [],
    );
    // 앞쪽에 모든 부모(?) nodeId를 전부 적어줘야 열림...
  };


  return (
    <Box>
        <Box sx={{ mb: 1 }}>
        <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
        </Button>
      </Box>  
    <TreeView
      aria-label="icon expansion"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      onNodeToggle={handleToggle}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400, position: 'relative' }}
    >
      <CustomTreeItem nodeId="1" label="Applications" bgColor='#e8f0fe' color='#1a73e8'>
        <CustomTreeItem nodeId="2" label="Calendar" />
        <CustomTreeItem nodeId="3" label="Chrome" />
        <CustomTreeItem nodeId="4" label="Webstorm" />
      </CustomTreeItem>
      <CustomTreeItem nodeId="5" label="Documents" color="#3c8039" bgColor="#e6f4ea">
        <CustomTreeItem nodeId="10" label="OSS" />
        <CustomTreeItem nodeId="6" label="MUI" >
          <CustomTreeItem nodeId="7" label="src">
            <CustomTreeItem nodeId="8" label="index.js" color="#a250f5" bgColor="#f3e8fd">
                <CustomTreeItem nodeId="11" label="HELLO" />
                <CustomTreeItem nodeId="12" label="BYE" >
                    <CustomTreeItem nodeId="13" label="OSS" />
                    <CustomTreeItem nodeId="14" label="MUI" />
                </CustomTreeItem>
            </CustomTreeItem>
            <CustomTreeItem nodeId="9" label="tree-view.js" />
          </CustomTreeItem>
        </CustomTreeItem>
      </CustomTreeItem>
    </TreeView>
    </Box>
  );
}