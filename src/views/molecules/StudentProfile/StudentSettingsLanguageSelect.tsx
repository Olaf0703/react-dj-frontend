import { FC } from 'react';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { SelectChangeEvent } from '@mui/material/Select';
import { LANGUAGES } from 'constants/common';
import { USER_SET_LANGUAGE } from 'app/types';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export const LanguageSelect: FC = () => {

    const dispatch = useDispatch()
    const language = useSelector((state: any) => state.user.language);

    const handleChange = (event: SelectChangeEvent) => {
        dispatch({ type: USER_SET_LANGUAGE, payload: event.target.value as string });
        //   TODO: Send backend  mutation to set language
    };

    return (
        <Box sx={{ minWidth: 150 }}>
            <FormControl fullWidth>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={language}
                    onChange={handleChange}
                >
                    {
                        LANGUAGES.map((lang) => (
                            <FormControlLabel key={lang.id} value={lang.value} control={<Radio />} label={lang.label} />
                        ))
                    }
                </RadioGroup>
            </FormControl>
        </Box>
    );
}
