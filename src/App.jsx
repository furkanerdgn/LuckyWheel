import { Box,Grid,Text,Heading,GridItem, Flex,Slide, Stack, VStack, FormControl,Input, Button, Center, FormLabel } from '@chakra-ui/react'
import { PlusSquareIcon,DeleteIcon,ChevronDownIcon,ArrowRightIcon,ArrowLeftIcon } from '@chakra-ui/icons'
import { useContext } from 'react'
import { ActivityContext } from './context/index.jsx'
import { useState,useEffect } from 'react'
import { Formik,useFormik } from 'formik'
import * as Yup from 'yup';
import { useDisclosure } from "@chakra-ui/react"
import Wheel from './components/Wheel.jsx'



function App() {

  const { activities, setActivities } = useContext(ActivityContext)
  const [placeholderVal, setPlaceholderVal] = useState(0)
  const [currentId, setCurrentId] = useState(0)
  const { isOpen, onToggle } = useDisclosure()

  const formik = useFormik({
    initialValues: {
      activity: '',
      desire: "",
    },
    validationSchema: Yup.object({
      activity: Yup.string()
        .required('Activity must be required'),
      desire: Yup.number()
        .required('Desire value must be required')
        .min(1, 'Must be between 1-30')
        .max(30, 'Must be between 1-30'),
    } ),

    onSubmit: values => {
      setActivities([...activities, {id:currentId,activity:values.activity,desire:values.desire}])
      setCurrentId(currentId+1)
      setPlaceholderVal(Math.floor(Math.random() * 10))
      formik.resetForm()
    },
  });

  const handleDeleteActivity = (inx) => {
    const updatedActivities = activities.filter((item) => item.id !== inx);
    setActivities(updatedActivities);
  };



  const placeholder = ["Reading Book",
  "Playing a musical instrument",
  "Going for a hike in nature",
  "Cooking a new recipe",
  "Painting or drawing",
  "Playing a sport (e.g., basketball, soccer, tennis)",
  "Watching a movie or TV show",
  "Gardening",
  "Yoga or meditation",
  "Learning a new language"]


  return (
    <>
      <Box
  bg="background: rgb(238,174,202);
  background: radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(178,148,233,0.34226190476190477) 100%);"
  color="brand.100"
  width="100%"
  minHeight="100vh"  // Use minHeight instead of height
  position="absolute"
  top="0"
  left="0"
  zIndex="-1"
> 

    <VStack>

    <Slide direction="left" overflowY="auto"  in={!isOpen} style={{ zIndex: 10 }}>
    <Box width="80%" minHeight="100vh"  bg="whiteAlpha.800">

      <form onSubmit={formik.handleSubmit}> 

      <Flex
       display="flex"
      flexWrap="wrap"

      gap={2}
      padding={4}
      justifyContent="center"

      >
        <Heading flexBasis="100%" color="pink" textAlign="center" margin={10} size={["2xl","3xl"]}>Enter Your Activity</Heading>
      <Flex justify="center" alignItems="flex-end" color="black" gap={2} >
        <Flex direction="column">
        <FormLabel fontSize={["xs","lg"]}>Activity</FormLabel>
        <Input type="text" id='activity' value={formik.values.activity} fontSize={["xs","lg"]} onChange={formik.handleChange}  placeholder={placeholder[placeholderVal]} />
        </Flex>
        <Flex direction="column">
        <FormLabel marginRight="0" fontSize={["xs","lg"]}>How much do you want</FormLabel>
        <Input type="number" id='desire' value={formik.values.desire} fontSize={["xs","lg"]} onChange={formik.handleChange}  placeholder="1-30" />
        </Flex>

      </Flex>
      <Box flexBasis="100%" gap={4} justifyContent="center" display="flex" textAlign="center"color="red" fontWeight="600" size="md" >
        {
          formik.errors.desire && formik.touched.desire ? <Text >
          {formik.errors.desire}
          </Text> : null
        }
        {
          formik.errors.activity && formik.touched.activity ? <Text >
          {formik.errors.activity}
          </Text> : null
        }
      </Box>
      <Button flexBasis="100%" type='submit'  marginX="22rem" borderRadius={50} marginTop={[1,4]} colorScheme="pink" size="md" >
        <ChevronDownIcon boxSize="1.4em" />
      </Button>
      </Flex>
        </form>
        <Heading color="pink" textAlign="center" margin={[3,10]} size="xl">Your Activities</Heading>
        <Grid
        templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(3, 1fr)","repeat(4, 1fr)"]}
        templateRows={["repeat(1, 1fr)","repeat(1, 1fr)","repeat(1, 1fr)","repeat(1, 1fr)"]}
        gap={4}
        marginLeft={10}
        marginRight={10}
        paddingBottom={10}
        >
          {activities.map((activity) => {
            return (
              <GridItem colSpan={1} key={activity.id} fontSize={["sm","lg"]} rowSpan={1} bg="whiteAlpha.800" borderRadius={10} padding={4} >
              <Flex flexDir="column" height="100%" gap={4}  textAlign="center" padding={2} justifyContent="space-between">
                <Text width="100%"  fontWeight="600" color="black">{activity.activity}</Text> 
                <Text width="100%" color="black">{activity.desire}</Text>                   
              <Button onClick={() => handleDeleteActivity(activity.id)} colorScheme="pink" size="md" >
                <DeleteIcon />
              </Button> 
              </Flex>
              </GridItem>
            )
          })}
        </Grid>

        </Box>


        <Box width="20%" height="100vh" bg="transparent" position="fixed" right="0" top="0" >

          <Box position="absolute" onClick={onToggle} cursor="pointer" border="2px dashed white" rounded={50} padding={[3,12]} top="50%" right="30%"  transform="translate(0,-50%)" >
            <ArrowRightIcon  boxSize={[3,12]}/>
          </Box>          
        </Box>
        </Slide>

        <Slide direction="right" in={isOpen} style={{ zIndex: 10 }}>
        
          <Box width="80%" height="100vh" position="absolute" flexWrap="wrap" justifyContent="center" right="0" display="flex" >
          <Wheel/>
          </Box>
        
        <Box width="20%" height="100vh" bg="transparent" position="fixed" left="0" top="0" >
          <Box position="absolute" onClick={onToggle} cursor="pointer" border="2px dashed white" rounded={50} padding={[3,12]} top="50%" left="30%"  transform="translate(0,-50%)" >
            <ArrowLeftIcon  boxSize={[3,12]}/>
          </Box>
        </Box>  
        </Slide>

          </VStack>
        </Box>
    </>
  )
}

export default App
