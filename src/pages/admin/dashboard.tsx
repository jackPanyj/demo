import { useEffect, useState } from "react"
import useFetch from '@/hooks/useFetch'
import { Button, Card, Spin } from 'antd';
import Meta from "antd/es/card/Meta";
import styles from './dashboard.module.less'
import { history } from "umi";


const Dashboard: React.FC = () => {
    const [list, setList] = useState<any[]>([])
    const { loading, data } = useFetch('/api/all')
    useEffect(() => {
        fetch('/api/all')
            .then(res => res.json())
            .then(res => {
                if (res.code === 200) {
                    setList(res.data)
                }
            })
    }, [])

    if (loading) {
        return (
            <div className={styles.dashboard}>
                <Spin />
            </div>
        )
    }


    return (
        <div className={styles.dashboard}>
            <div className={styles.title}>Dashboard</div>
            
            <div className={styles.home}>
                <Button type='link' onClick={() => history.push('/')}>Go Home</Button>
            </div>
            <div className={styles.list}>
                {list.map(item => {
                    return (
                        <div key={item.id}>
                            <Card
                                hoverable
                                style={{ width: 240, height: 300 }}
                                cover={<img alt={item.name} src={item.govPicture} />}
                            >
                                <Meta title={item.name} description={item.govNumber} />
                            </Card>
                        </div>

                    )
                })}
            </div>

        </div>
    )
}

export default Dashboard