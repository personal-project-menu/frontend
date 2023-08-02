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
  permission?: number;
  children?: readonly RenderTree[]; //없을 수도 있음 근데 아마 "" <-이걸로 도착할것 같은데
}


/*
이렇게 되면 내가 임의로 루트를 만들고 Children부터 채워야한다..

*/

const data: RenderTree = {
  id: 'root',
  name: 'Parent',
  permission: 0,
  children: [
    {
      id: '1',
      name: 'Child - 1',
      permission: 0,
    },
    {
      id: '3',
      name: 'Child - 3',
      permission: 0,
      children: [
        {
          id: '4',
          name: 'Child - 4',
          permission: 1,
          children: [
            {
                id: '5',
                name: 'Child - 5',
                permission: 0,
                children: [
                    {
                        id: '6',
                        name: 'Child - 6',
                        permission: 5,
                    },
                    {
                        id: '7',
                        name: 'Child - 7',
                        permission: 6,
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
    const [bgColor, setBgColor] = React.useState<string> ("#FFFFFF"); //default 흰
    const [color, setColor] = React.useState<string> ("#000000"); // default : 검

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


    const findColor = (permission : number = -1) => { //nil인 경우 -1 
        
        permission

        switch(permission) {
            case 0:
                setBgColor('#')
                setColor('#')
                break;
            case 1:
                setBgColor('#')
                setColor('#')
                break;
            case 5:
                setBgColor('#')
                setColor('#')
                break;
            case 6:
                setBgColor('#')
                setColor('#')
                break;
            default: //아무것도 없을땐 그냥 default color를 이용
                break;
        }

    }

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