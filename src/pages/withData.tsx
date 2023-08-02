import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

//데이터 부분 

interface RenderTree {
  id: string;
  name: string;
  children?: readonly RenderTree[];
}


/*
이렇게 되면 내가 임의로 루트를 만들고 Children부터 채워야한다..

*/

const data: RenderTree = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
          children: [
            {
                id: '5',
                name: 'Child - 5',
                children: [
                    {
                        id: '6',
                        name: 'Child - 6',
                    },
                    {
                        id: '7',
                        name: 'Child - 7',
                    }
                ]
            }
          ]
        },
      ],
    },
  ],
};



//색상 부분




export default function RichObjectTreeView() {

    const [expanded, setExpanded] = React.useState<string[]>([]);
    const [nodelists, setNodelits] = React.useState<string[]>([]);

    const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
        setExpanded(nodeIds);
    };

    const handleExpandClick = () => {
        setExpanded((oldExpanded) =>
            oldExpanded.length === 0 ? nodelists : [],
    );
    };

    const getNodeLists = (nodes: RenderTree) => {

        if(Array.isArray(nodes.children)){
            nodelists.push(nodes.id)
            nodes.children.map((node) => getNodeLists(node))
        }else{
            nodelists.push(nodes.id)
        }
    }


    React.useEffect(() => {
        console.log("?왜 두번 실행되는거지")
        getNodeLists(data)

        nodelists.forEach(element => {
            console.log(element)
            
        });
        console.log(nodelists.length)
    },[]);

    const renderTree = (nodes: RenderTree) => (
        <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} color='#a250f5'>
            {Array.isArray(nodes.children)
            ? nodes.children.map((node) => renderTree(node))
            : null}
        </TreeItem>
    );

    return (
        <Box>
            <Box sx={{ mb: 1 }}>
                <Button onClick={handleExpandClick}>
                    {expanded.length === 0 ? 'Expand all' : 'Collapse all'}
                </Button>
            </Box>  

            <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            expanded={expanded}
            onNodeToggle={handleToggle}
            sx={{flexGrow: 1, overflowY: 'auto' }}
            >
                {renderTree(data)}
            </TreeView>
        </Box>
  );
}